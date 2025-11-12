import torch
import torchvision.transforms as transforms
from PIL import Image
import joblib  # need to define this into helper file later on...


EmotionMap = {
    "anger": 0,
    "contempt": 1,
    "disgust": 2,
    "fear": 3,
    "happy": 4,
    "neutral": 5,
    "sad": 6,
    "surprise": 7,
}
Map = {v: k for k, v in EmotionMap.items()}


def Predict(imgpath, model):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    PredictionEmotionMap = EmotionMap.copy()
    img = Image.open(imgpath)
    img = transforms_test(img)
    img = img.unsqueeze(0)
    img = img.to(device)
    model = model.to(device)
    model.eval()
    with torch.no_grad():
        y_pred = model(img)

    prediction_confidence_array = (
        torch.nn.functional.softmax(y_pred, dim=1)[0].cpu().numpy()
    )
    for i in range(len(prediction_confidence_array)):
        emotion = Map[i]
        PredictionEmotionMap[emotion] = prediction_confidence_array[i]

    return PredictionEmotionMap


target_size = (224, 224)
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]
transforms_test = transforms.Compose(
    [
        transforms.Resize(target_size),
        transforms.CenterCrop(target_size),
        transforms.ToTensor(),
        transforms.Normalize(mean, std),
    ]
)


def PredictWithModel(imgpath):
    model = joblib.load("resnet_fine_tuned.pkl")
    emotionsmap = Predict(imgpath, model)
    return emotionsmap
