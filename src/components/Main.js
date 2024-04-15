import React from "react";
import { useState } from "react";
import { Container, Grid, Item, Image } from "semantic-ui-react";
import imageCompression from "browser-image-compression";

export default function Main() {
  const [origImage, setOrigImage] = useState("");
  const [origImageFile, setOrigImageFile] = useState("");
  const [compImage, setCompImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState(<b>Browse file to upload</b>);

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setText(fileName);
    if (!imageFile) return;
    setFileName(imageFile.name);
    setOrigImage(imageFile);
    setOrigImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };

  const compressed = (e) => {
    e.preventDefault();

    const option = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (option.maxSizeMB >= origImage / 1024) {
      alert("Image is too small, can't be compressed!");
      return false;
    }

    let output;
    imageCompression(origImage, option).then((x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      setCompImage(downloadLink);
    });
  };

  return (
    <>
      <Container className="main m-5 text-center">
        <div class="heading container my-5">
          <h1>Image Compression Tool</h1>
        </div>

        <Grid className="my-3">
          <label htmlFor="input" name="input" cursor="pointer">
            <div className="input my-5 ">
              <Grid.Row width={6} height={20}>
                <Item>
                  {origImage ? (
                    <Image src={origImageFile}></Image>
                  ) : (
                    <i className="fa-solid fa-file-import my-5"></i>
                  )}
                  , <br />
                  {text}
                </Item>
              </Grid.Row>
            </div>
          </label>

          <Grid.Row width={4}>
            <input
              id="input"
              cursor="pointer"
              type="file"
              accept="image/"
              className="mt-2 btn btn-sucess w-90"
              onChange={(e) => handle(e)}
            />
            {origImage && (
              <button
                type="button"
                class="btn btn-outline-primary my-2"
                onClick={(e) => {
                  compressed(e);
                }}
              >
                Compressed
              </button>
            )}
            <br />
          </Grid.Row>

          <div className="input my-5 ">
            <Grid.Row width={10} height={20}>
              <br />
              <br />

              <Item>
                {compImage ? (
                  <Image src={compImage}></Image>
                ) : (
                  <h3>Image shown here after compressing</h3>
                )}
              </Item>
            </Grid.Row>
          </div>
          <Grid.Row width={4}>
            <br />
            {compImage && (
              <button type="button" class="btn btn-outline-primary">
                <a href={compImage} download={fileName}>
                  {" "}
                  Download
                </a>
              </button>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}
