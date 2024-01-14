
from django.core.paginator import Paginator
from io import BytesIO

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Image, Paragraph
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from recipe.models import Recipe
from recipe.serializers import RecipeSerializer

import base64
from PIL import Image as PILImage, UnidentifiedImageError

def extract_base64_image(data_uri):
    # Split the data URI to extract the base64-encoded image data
    _, base64_data = data_uri.split(',', 1)
    return base64_data

# Create your views here.

def recipe_generator(recipe):
    buffer = BytesIO()

    # Create a PDF document
    p = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []

    # Header
    header_text = "Recipe Details: " + str(recipe.name)
    elements.append(paragraph(header_text, style='Heading1'))

    # Add a table for key details
    key_details_data = [
        ["Difficulty", str(recipe.difficulty)],
        ["Estimated Time", f"{recipe.time_min} - {recipe.time_max} minutes"],
        ["Estimated Price", str(recipe.estimated_price)],
        ["Number of People", str(recipe.number_people)],
        ["Recipe Type", str(recipe.type_recipe)],
        ["Calories per Recipe", str(recipe.total_calories)],
    ]
    key_details_table = Table(key_details_data, colWidths=[120, 200])
    key_details_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.white),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.darkred),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ]))
    elements.append(key_details_table)

    # Ingredients
    ingredients_text = "Ingredients:\n" + "\n".join([f"• {ingredient.name}" for ingredient in recipe.ingredients.all()])
    elements.append(paragraph(ingredients_text))

    # Description
    description_text = "Description:\n" + str(recipe.description)
    elements.extend(split_description(description_text))
########################
    try:
        # Extract base64-encoded image data
        img_data = base64.b64decode(extract_base64_image(recipe.photo))
        img_io = BytesIO(img_data)
        img = PILImage.open(img_io)

        # Convert the image to 'RGB' mode before saving as JPEG
        img = img.convert('RGB')

        # Resize the image if necessary
        max_width = 400
        if img.width > max_width:
            ratio = max_width / float(img.width)
            img = img.resize((max_width, int(img.height * ratio)))

        # Embed the image in the PDF
        img_io = BytesIO()
        img.save(img_io, 'JPEG')
        img_io.seek(0)
        elements.append(Image(img_io, width=400, height=img.height))
    except UnidentifiedImageError as e:
        # Handle the error
        print(f"Error decoding image: {e}")
        # You can add additional logging or return an error message if needed

    # Build the PDF document
    p.build(elements)

    pdf_content = buffer.getvalue()
    buffer.close()

    return pdf_content


def paragraph(text, style='BodyText'):
    style_settings = [
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 0), (-1, 0), colors.white),  # Adjust background color if needed
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.darkred),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),  # Adjust font if needed
    ]

    return Table([[text]], style=style_settings)


def split_description(description_text, max_paragraph_length=300):
    """
    Split the description into paragraphs of a specified length.
    """
    style_sheet = getSampleStyleSheet()
    paragraph_style = style_sheet['BodyText']

    paragraphs = description_text.split('\n')
    split_paragraphs = []

    for paragraph in paragraphs:
        words = paragraph.split()
        current_length = 0
        current_paragraph = []

        for word in words:
            if current_length + len(word) + 1 <= max_paragraph_length:
                current_paragraph.append(word)
                current_length += len(word) + 1
            else:
                split_paragraphs.append(Paragraph(' '.join(current_paragraph), paragraph_style))
                current_paragraph = [word]
                current_length = len(word) + 1

        if current_paragraph:
            split_paragraphs.append(Paragraph(' '.join(current_paragraph), paragraph_style))

    return split_paragraphs

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def update(self, request, *args, **kwargs):
        # Get the instance of the recipe
        instance = self.get_object()

        # Check if the current user is the creator of the recipe
        if request.user != instance.creator:
            return Response({'detail': 'You are not allowed to update this recipe.'}, status=status.HTTP_403_FORBIDDEN)

        super().update(request) 

    @api_view(['GET'])
    def recipe_detail(self, request, id):
        recipe = Recipe.objects.get(pk=id)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def download_recipe_pdf(request, id):
        recipe = Recipe.objects.get(pk=id)
        pdf_content = recipe_generator(recipe)

        response = HttpResponse(pdf_content, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{recipe.name}_recipe.pdf"'
        return response

    def get_queryset(self):
        recipes = Recipe.objects.all()
        request_data = self.request.GET
        if 'difficulty' in request_data:
            recipes = recipes.filter(difficulty=int(request_data['difficulty']))
        if 'name' in request_data:
            recipes = recipes.filter(name__icontains=request_data['name'])
        if 'ingredients' in request_data:
            recipes = recipes.filter(ingredients__name__icontains=request_data['ingredients'])
        if 'time' in request_data:
            recipes = recipes.filter(time_min__lte=int(request_data['time']), time_max__gte=int(request_data['time']))
        if 'number_people' in request_data:
            recipes = recipes.filter(number_people=request_data['number_people'])
        if 'type_recipe' in request_data:
            recipes = recipes.filter(type_recipe=request_data['type_recipe'])
        if 'estimated_price_min' in request_data:
            if 'estimated_price_max' in request_data:
                recipes = recipes.filter(estimated_price__gte=int(request_data['estimated_price_min']),
                                                estimated_price__lte=int(request_data['estimated_price_max']))
            else:
                recipes = recipes.filter(estimated_price__gte=int(request_data['estimated_price_min']))
        elif 'estimated_price_max' in request_data:
            recipes = recipes.filter(estimated_price__lte=int(request_data['estimated_price_max']))
        if 'total_calories_min' in request_data:
            if 'total_calories_max' in request_data:
                recipes = recipes.filter(total_calories__gte=int(request_data['total_calories_min']),
                                                total_calories__lte=int(request_data['total_calories_max']))
            else:
                recipes = recipes.filter(total_calories__gte=int(request_data['total_calories_min']))
        elif 'total_calories_max' in request_data:
            recipes = recipes.filter(total_calories__lte=int(request_data['total_calories_max']))
        page_number = request_data.get('page')

        if page_number:
            paginator = Paginator(recipes, 10)
            page_obj = paginator.get_page(page_number)
            recipes = page_obj.object_list
        return recipes


