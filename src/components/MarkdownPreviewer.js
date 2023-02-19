import "../css/style.scss";
import { useEffect, useState } from "react";
import { marked } from "marked";
import  Placeholder from "./Placeholder.js";

function MarkdownPreviewer() {
    const [input, setInput] = useState(Placeholder);

    const [editorWindow, setEditorWindow] = useState(false);

    const [previewWindow,setPreviewWindow] = useState(false);

    const changeIcon = (iconLocation) => {
        if (iconLocation.classList.contains("bi-arrow-up-right-square")) {
            iconLocation.classList.replace("bi-arrow-up-right-square", "bi-arrow-down-left-square");
        } else {
            iconLocation.classList.replace("bi-arrow-down-left-square", "bi-arrow-up-right-square");
        }
    }

    

    useEffect(() => {
        let editorWrap = document.getElementById("editorWrap");
        let previewWrap = document.getElementById("previewWrap");
        const editorIcon = document.getElementsByClassName("bi")[0];

        editorWrap.classList.toggle("maximized");
        previewWrap.classList.toggle("hide");

        changeIcon(editorIcon);
    }, [editorWindow]);

    useEffect(() => {
        let previewWrap = document.getElementById("previewWrap");
        let editorWrap = document.getElementById("editorWrap");
        const previewIcon = document.getElementsByClassName("bi")[1];

        previewWrap.classList.toggle("maximized");
        editorWrap.classList.toggle("hide");

       
        changeIcon(previewIcon);
    }, [previewWindow]);


    return (
        <div className="container">
            {/* Editor */}
            <div className="editorWrap" id="editorWrap">
                <div id="toolbarEditor">
                    <p>Editor</p>
                    <i
                        className="bi bi-arrow-up-right-square"
                        onClick={() => {
                            setEditorWindow(!editorWindow);
                        }}
                    ></i>
                </div>
                <textarea id="editor" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>

            {/* Preview */}
            <div id="previewWrap" className="previewWrap">
                <div id="toolbarPreview">
                    <p>Preview</p>
                    <i
                        className="bi bi-arrow-up-right-square"
                        onClick={() => {
                            setPreviewWindow(!previewWindow);
                        }}
                    ></i>
                </div>
                <div id="preview" dangerouslySetInnerHTML={{ __html: marked.parse(input) }}></div>
            </div>
        </div>
    );
}

export default MarkdownPreviewer;
