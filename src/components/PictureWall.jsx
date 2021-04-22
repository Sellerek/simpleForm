import React, { Component } from "react";
import { Upload, Modal } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      rejectedFiles: [],
      wrongFileType: ""
    };
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  beforeUpload(file) {
    const isGoodFileType = this.props.fileType
      ? this.props.fileType.some(types => types === file.type)
      : file.type === "image/jpeg" || file.type === "image/jpg";

    if (!isGoodFileType) {
      this.setState({
        wrongFileType: "wrong",
        error: this.props.fileType
          ? "You can only upload " +
            this.props.fileType
              .map(types => types.split("/")[1])
              .toString()
              .replace(/,/g, "/") +
            " files!"
          : "You can only upload JPG/JPEG file!"
      });
    }

    return isGoodFileType;
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleRemoveRejectedFile = i => {
    let files = this.state.rejectedFiles;

    this.setState({
      rejectedFiles: files.filter((file, index) => index !== i),
      wrongFileType: ""
    });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload - only JPG/JPEG</div>
      </div>
    );
    return (
      <>
        <ImgCrop>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            beforeUpload={this.beforeUpload}
            onClick={this.handleRemoveRejectedFile}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        {this.props.errors &&
        this.props.touched &&
        this.state.wrongFileType !== "" ? (
          <>
            {this.props.errors && this.props.touched && (
              <div className="feedback-container">
                <span className="form__input-text">
                  Załączasz plik w formacie, którego nie obsługujemy. Upewnij
                  się, że Twój plik to JPG lub JPEG.
                </span>
              </div>
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default PicturesWall;
