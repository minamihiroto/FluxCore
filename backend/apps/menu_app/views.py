import os
from dotenv import load_dotenv
from py2neo import Graph
from django.http import JsonResponse

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
graph = Graph(os.environ.get('BOLT_URL'), auth=(
    os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))


def fetch_tree(request):
    query = """
    MATCH (b:Box)-[r:child*0..]->(d)
    WHERE (b:Box) OR (d:Directory) OR (d:Document)
    RETURN ID(d) as id, d.name as name, labels(d) as node_labels, 
    d.created_by as created_by, ID(startNode(last(r))) as parentId,
    labels(startNode(last(r))) as parent_labels
    """
    tree_data = graph.run(query).data()

    return JsonResponse(tree_data, safe=False)
