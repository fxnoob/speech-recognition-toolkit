import React from "react";

export default class Faq extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>
          This is an Open Source project created by{" "}
          <a href="https://www.facebook.com/HiteshSaini99/" target="_blank">
            Hitesh Saini
          </a>
          .
        </p>
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
