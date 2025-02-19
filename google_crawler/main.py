from scholarly import scholarly
import jsonpickle
import json
from datetime import datetime
import os

author: dict = scholarly.search_author_id("cfIJXfoAAAAJ")
scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
name = author['name']
# print(author['publications'])
# author['updated'] = str(datetime.now())
# author['publications'] = {v['author_pub_id']:v for v in author['publications']}
# print(json.dumps(author, indent=2))
# os.makedirs('../assets/google_scholar', exist_ok=True)
# with open(f'../assets/results/gs_data.json', 'w') as outfile:
#     json.dump(author, outfile, ensure_ascii=False)

os.makedirs('../assets/google_scholar', exist_ok=True)
for  pub in author['publications']:
    print(pub['author_pub_id'], pub['num_citations'])
    shieldio_data = {
      "schemaVersion": 1,
      "label": "citations",
      "message": f"{pub['num_citations']}",
    }
    with open(f'../assets/google_scholar/{pub["author_pub_id"]}.json', 'w') as outfile:
        json.dump(shieldio_data, outfile, ensure_ascii=False)