from django.http import JsonResponse
from django.views import View
from py2neo import Graph
from rest_framework.decorators import api_view
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
graph = Graph(os.environ.get('BOLT_URL'), auth=(
    os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))

@api_view(['GET'])
def get_directory(request, directory_id):
    query = """
            MATCH path=(b:Box)-[*]-(d:Directory)
            WHERE ID(d) = $directory_id
            RETURN path
        """
    result = graph.run(query, {'directory_id': int(directory_id)}).data()

    breadcrumbs = []
    for record in result:
        for node in record['path'].nodes:
            breadcrumbs.append({'id': node.identity, 'name': node['name']})

    return JsonResponse({'breadcrumbs': breadcrumbs})

@api_view(['GET'])
def get_document(request, document_id):
    query = """
            MATCH path=(b:Box)-[*]-(d:Document)
            WHERE ID(d) = $document_id
            RETURN path
        """
    result = graph.run(query, {'document_id': int(document_id)}).data()

    breadcrumbs = []
    for record in result:
        for node in record['path'].nodes:
            breadcrumbs.append({'id': node.identity, 'name': node['name']})

    return JsonResponse({'breadcrumbs': breadcrumbs})