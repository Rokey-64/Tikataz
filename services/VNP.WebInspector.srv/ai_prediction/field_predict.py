import pandas as pd
from joblib import load
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import TfidfVectorizer
from ai_prediction.label import labeled_data
import math
import torch

model = load(rf'./ai_prediction/models/decision_tree/model.joblib')
tfidf = load(rf'./ai_prediction/models/decision_tree/tfidf_vectorizer.joblib')
mlb = load(rf'./ai_prediction/models/decision_tree/multilabel_binarizer.joblib')

def predict_field(texts: list):
    if not texts:
        return {}, {}
    
    trans_text = tfidf.transform(texts)
    if trans_text.shape[1] != model.n_features_in_:
        return {}, {}
    
    prediction = model.predict(trans_text)
    visualization = mlb.inverse_transform(prediction)
    
    return visualize_predict(visualization), mapping_keyword(visualization, texts)

def visualize_predict(visualization: list) -> dict:
    tags = {}
    
    for i in visualization:
        for j in i:
            tags[j] = tags.get(j, 0) + 1

    return tags

def mapping_keyword(visualization: list, texts: list)->dict:
    """
    Hold the keyword and the label of the keyword in the prediction.
    """
    label = {}
    for i in range(len(visualization)):
        for j in visualization[i]:
            label[j] = label.get(j, []) + [texts[i],]

    return label

def beautify_predict(visualization: dict) -> str:
    sorted_by_key = dict(sorted(visualization.items(), key=lambda x: x[1], reverse=True))
    for key, value in sorted_by_key.items():
        prnt = f"{key}: {value} : {labeled_data(key)}"
        print(prnt)

def merge_predict(home:dict, profile:dict, rate:int) -> dict:
    merge:dict = {}
    for key, value in home.items():
        merge[key] = value * rate

    for key, value in profile.items():
        merge[key] = merge.get(key, 0) + value

    return merge

def get_weighted_predict(merge:dict, without_this:list) -> dict:
    """
    This function is used to get the weighted prediction using the softmax function
    """
    weighted_result:dict = {}
    if not merge:
        return weighted_result
    
    for item in without_this:
        merge.pop(item, None)

    lst = list(merge.values())
    sum_value = sum(lst)

    for key, value in merge.items():
        weighted_result[key] = round(value/sum_value * 100, 3)
    
    return weighted_result

def keyword_rating(documents:list):
    """
    This function is used to rate the keyword in the documents
    """
    if not documents:
        return {}
    
    vectorizer = TfidfVectorizer(ngram_range=(2, 2))

    tfidf_matrix = vectorizer.fit_transform(documents)
    feature_names = vectorizer.get_feature_names_out()

    for doc_idx, doc in enumerate(documents):
        print(f"Văn bản {doc_idx + 1}: {doc}")
        feature_index = tfidf_matrix[doc_idx, :].nonzero()[1]
        tfidf_scores = zip(feature_index, [tfidf_matrix[doc_idx, x] for x in feature_index])
        for w, s in tfidf_scores:
            print(f"Từ: {feature_names[w]}, TF-IDF: {s:.4f}")
        print("\n")
    


