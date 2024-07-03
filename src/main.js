import { bootstrapCameraKit, createMediaStreamSource, Transform2D, } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({ 
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4OTg3ODg3LCJzdWIiOiJkN2UwNWJjYS02ODVkLTQ0ZGItODE0Mi01ZDg0YTA3YjRlYWJ-UFJPRFVDVElPTn41NTEzNzczNi02YzA2LTRkMjktYjg0YS0wN2Y1MTlhZGRjZGUifQ.sECS_i5kKnojrBmdFNF0r5P8HMnebLJx8P6Xex9VcSE' });

const session = await cameraKit.createSession();

document.getElementById('canvas').replaceWith(session.output.capture);

const lens = await cameraKit.lensRepository.loadLens(
    '5acc3c5f-c8fc-4658-a782-dc191df1c2b4',
    '1ab5269b-f2b0-4570-a30f-74a123521727'
  );

const mediaStream = await navigator.mediaDevices.getUserMedia({
  video:{
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { exact: "environment" },
  },
});

const source = createMediaStreamSource(mediaStream, { cameraType: 'environment' 
})

await session.setSource(source);

//source.setRenderSize(window.innerWidth, window.innerHeight)

session.play('capture');

//await session.applyLens(lens);

await window.setTimeout(function(){session.applyLens(lens)},500);

playNow();

})();

function playNow(){
  document.getElementById("playbtn").style.display === "none";
  window.setTimeout(function(){document.getElementById("playbtn").style.display = "block";},5000);
}