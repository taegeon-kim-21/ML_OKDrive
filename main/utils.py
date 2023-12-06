import os
import numpy as np
import pickle
import openai

from tensorflow import keras
from keras.models import load_model, Model
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.image import load_img, img_to_array
from keras.applications.vgg16 import preprocess_input, VGG16
from django.conf import settings




# VGG16 모델 로드 및 구조 변경
vgg_model = VGG16()
vgg_model = Model(inputs=vgg_model.inputs, outputs=vgg_model.layers[-2].output)


# 직접 파일 경로 설정
model_path = os.path.join(settings.BASE_DIR, 'models', 'best_model.h5')
tokenizer_path = os.path.join(settings.BASE_DIR, 'models', 'tokenizer.pkl')


model = load_model(model_path)

with open(tokenizer_path, 'rb') as f:
    tokenizer = pickle.load(f)

# 최대 길이 설정 (필요한 경우)
max_length = 35  # 미리 계산된 최대 길이

def idx_to_word(integer, tokenizer):
    for word, index in tokenizer.word_index.items():
        if index == integer:
            return word
    return None

def predict_caption(model, feature, tokenizer, max_length):
    in_text = 'startseq'
    for i in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)

        feature_array = np.array([feature.flatten()])
        sequence_array = np.array(sequence)

        yhat = model.predict([feature_array, sequence_array], verbose=0)
        yhat = np.argmax(yhat)
        word = idx_to_word(yhat, tokenizer)
        if word is None or word == 'endseq':
            break
        in_text += ' ' + word
     # 'startseq'를 제거하고 반환
    final_caption = in_text.split(' ', 1)[1]
    return final_caption

def generate_caption(image_path, model, tokenizer, max_length, vgg_model):
    image = load_img(image_path, target_size=(224, 224))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    feature = vgg_model.predict(image, verbose=0)[0]
    caption = predict_caption(model, feature, tokenizer, max_length)
    return caption



def translate_with_gpt(input_text):
    #openai.api_key = settings.OPENAI_API_KEY
    #openai.api_key = 
    model = "gpt-3.5-turbo"
    response = openai.ChatCompletion.create(
        model=model, messages=[{"role": "user", "content": input_text}]
    )
    return response.choices[0].message['content']
