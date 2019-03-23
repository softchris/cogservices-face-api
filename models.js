class FaceResponse {
  constructor(faces) {
    this.facesArray = [];
    console.log('faces length', faces.length);
    for (var i = 0; i < faces.length; i++) {
      console.log('parsing face');
      this.facesArray.push(new Face(faces[i]));
    }
  }
}

class Face {
  constructor(face) {
    this.faceRectangle = face.faceRectangle;
    this.faceAttributes = face.faceAttributes.emotion;
    console.log('face', this.faceAttributes);
    // const { 
    //   anger, 
    //   contempt, 
    //   disgust, 
    //   fear, 
    //   happiness, 
    //   neutral, 
    //   sadness, 
    //   surprise 
    // } = faceAttributes;
    const keys = Object.keys(this.faceAttributes);
    let emotion = {
      name: keys[0],
      value: this.faceAttributes[keys[0]]
    };
    for (var i = 0; i < keys.length; i++) {
      const currValue = this.faceAttributes[keys[i]];
      if (currValue > emotion.value) {
        emotion = {
          name: keys[i],
          value: currValue
        };
      }
    }

    console.log(`This face is mostly ${emotion.name} with score: ${emotion.value * 100}%`);
  }
}

module.exports = { 
  FaceResponse,
  Face
};