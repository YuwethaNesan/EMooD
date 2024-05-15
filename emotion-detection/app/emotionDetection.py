from fer import FER
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import tensorflow as tf

def getEmotion(file):
    detector = FER(mtcnn=True)
    img = plt.imread(file)
    result = detector.detect_emotions(img)
    if result:
        emotion, score = _getTopEmotion(result)
        return [emotion, score]
    else:
        return []


# Load your trained model
# model_path = "./model_weights_FER.weights.h5"
# model = tf.keras.models.load_model(model_path)

def _getTopEmotion(result):
    return sorted(list(result[0]["emotions"].items()), key=lambda x: x[1])[-1]

