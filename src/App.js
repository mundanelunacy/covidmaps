import React, { useState } from "react";
import "./App.css";
import { Input, Button } from "@material-ui/core";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const submitForm = async (contentType, data, setResponse) => {
    try {
        const response = await axios({
            url: `${API_BASE}/upload`,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": contentType
            }
        });
        setResponse(response.data);
    } catch (error) {
        setResponse("error");
    }
};

const App = () => {
    const [file, setFile] = useState(null);

    const uploadWithFormData = () => {
        const formData = new FormData();

        formData.append("file", file);

        submitForm("multipart/form-data", formData, msg => console.log(msg));
    };

    return (
        <div>
            <Input type="file" name="file" onChange={e => setFile(e.target.files[0])} />
            <Button onClick={uploadWithFormData}>Upload</Button>
        </div>
    );
};

export default App;
