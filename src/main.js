import{
    bootstrapCameraKit,
    createdMediaStreamSource,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function(){
    var cameraKit = await bootstrapCameraKit({ apiToken: '<eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzEzNzQyNjA2LCJzdWIiOiJmZGJiYzBiOC0zNmEwLTRjZTItOTZmNi00YWE3OTFjMDY4YzZ-U1RBR0lOR341MWM4YWUxOC01MGYzLTQ5NGUtOWE0Yy04ZmZkNDc1YzJhNWYifQ.5IbWoJ7qPntSAhLu_JUcSBW4f6JUTinHsSjcN1_SdZ0'})

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const {lenses} = await cameraKit.lensRepository.loadLensGroups(['2a68ceb6-5a90-4c1d-8f28-a02781e4a013'])

    session.applyLens(lenses[0])
    let mediaSteam = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }
});

    const source = createMediaStreamSource(mediaSteam, { 
        cameraType: 'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})();