from django.http import JsonResponse
from neo4j import GraphDatabase
from dotenv import load_dotenv
from py2neo import Graph
import os

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
graph = Graph(os.environ.get('BOLT_URL'), auth=(
    os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))

def fetch_tree(request):
    query = """
    MATCH (b:Box)-[:child*0..]->(d)
    WHERE (b:Box) OR (d:Directory) OR (d:Document)
    RETURN d
    """
    tree_data = graph.run(query).data()

    return JsonResponse(tree_data, safe=False)