import React from "react";

export default class Faq extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>This is an Open Source project.</p>
        <p>
          If you run into any issue, report it{" "}
          <a
            href="https://github.com/fxnoob/speech-recognition-tool/issues"
            target="_blank"
          >
            Here
          </a>
          .
        </p>
      </div>
    );
  }
}
