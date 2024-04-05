import React from 'react';

function UploadPage(props)
{
    return (
        <div>
            <h1>Image Upload</h1>
            <input type="file" id="imageInput"/>
            <button onClick={props.uploadPublic_prop}>Upload public</button>
            <button onClick={props.uploadPrivate_prop}>Upload private</button>
            <div>
                {props.uploadedsuccesfully_prop===1  && <h1>Uploaded sucssfully</h1>} 
            </div>
            <button onClick={props.show_image_public_prop}>View public Images</button>
            <button onClick={props.show_image_private_prop}>View private Images</button>
        </div>
    );
}
export default UploadPage;

{/* <div>{image && (
          <div>
            <p>File is available for download.</p>
          </div>
        )}</div>
        <button onClick={show_image}>Retrieve</button> */}