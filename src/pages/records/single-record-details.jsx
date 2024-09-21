import {
  IconChevronRight,
  IconChevronUpRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";
import React, { useState } from "react";
import RecordDetailsHeader from "./components/record-details-header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FileUploadModal from "./components/file-upload-modal";
import { useStateContext } from "../../context";
import { GoogleGenerativeAI } from "@google/generative-ai";
const geminiAPIKey = import.meta.env.VITE_GEMINI_API_KEY;
import ReactMarkdown from "react-markdown";
function SingleRecordDetails() {
  const { recordName } = useParams();

  // ! here is the state :
  const { state } = useLocation();

  console.log("the state is : when the record is clicked ?  ", state);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "No analysis available.",
  );
  const [filename, setFilename] = useState("");
  const [fileType, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateRecord } = useStateContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFilename(file.name);
    setFileType(file.type);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // When file reading is done, resolve the promise with the Base64 string (excluding the "data:..." prefix)
      reader.onload = () => resolve(reader.result.split(",")[1]);

      // If an error occurs during file reading, reject the promise with the error
      reader.onerror = () => reject(reader.error);

      // Initiate reading the file as a Data URL (Base64 encoded string)
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(geminiAPIKey);

    try {
      const base64Data = await readFileAsBase64(file);
      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: fileType,
          },
        },
      ];

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });

      const prompt = `You are a highly skilled medical diagnosis analyst with expertise in oncology and complex diseases. Using the provided analysis data, create a detailed and personalized treatment plan. Your response should include:

Diagnosis Summary: Clearly explain the diagnosis, including the stage and type of disease. Provide a concise overview of the findings.

Test Results Interpretation: Describe the results of the diagnostic tests in layman's terms. Include information on any tumors, biopsies, scans, or other relevant tests, and what these results mean for the patient.

Recommended Treatment Plan: Outline the suggested treatments, including chemotherapy, radiation therapy, surgery, or any other recommended interventions. Explain each treatment option's purpose and how it will address the condition.

Next Steps: Provide guidance on what the patient should discuss with their healthcare provider. This may include understanding their diagnosis in more detail, discussing treatment plans, potential side effects, and any lifestyle changes that might support treatment.

Important Note: Emphasize that this information is for educational purposes and that consulting with qualified healthcare professionals is crucial for personalized advice and treatment.

Ensure your response is clear, structured in well-organized paragraphs, and easy to understand.`;

      const results = await model.generateContent([prompt, ...imageParts]);

      const response = await results.response;
      const text = response.text();
      setAnalysisResult(text);

      const updaterecord = await updateRecord({
        documentID: state?.id,
        analysisResult: text,
        KanbanRecords: "",
      });

      setUploadSuccess(true);
      setIsModalOpen(false);
      setFilename("");
      setFile(null);
    } catch (error) {
      console.log("error while handleing file upload ", error);
      setUploadSuccess(false);
      setIsModalOpen(false);
    } finally {
      setUploading(false);
    }
  };



  const processTreatmentPlan = async ()=>{
    setProcessing(true) 
    const genAI = new GoogleGenerativeAI(geminiAPIKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });

    const prompt = `
      Your role and goal is to be a diagnosis analyst that will be using this treamment plan ${analysisResult} to create to create colums for 
      - Todo : tasks that need to be started 
      - Doing : tasks that are in prgress 
      - Done : Tasks that are completed 
      Each task  should include a brief decription. the tasks should be categorised in the manner stated above. divide the tasks as efficiently as possible.
      Please provide the results in the following format for easy front end display.
      {
        "Columns" :[{"id" : "todo" , "title" ,"Todo"},
        {"id" : "doing" , "title" ,"Work in Progress"},
        {"id" : "done" , "title" ,"Done"}]
        "Tasks" : [
            {"id" : "1" , "columnId" : "todo" , "content" : "Example text that should be the appropriate task "},
            {"id" : "2" , "columnId" : "todo" , "content" : "Example text that should be the appropriate task "},
            {"id" : "3" , "columnId" : "doing" , "content" : "Example text that should be the appropriate task "},
            {"id" : "4" , "columnId" : "doing" , "content" : "Example text that should be the appropriate task "},
            {"id" : "5" , "columnId" : "done" , "content" : "Example text that should be the appropriate task "}
        ]

      }

      give me a pure json response without any other non jason character 
    `
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = await response.text();
  
      // Log the response text for debugging
      text = text.replace(/^```json/, '').replace(/```$/, '').trim();
      // Attempt to parse the JSON
      const parseResponse = JSON.parse(text);
      console.log("is the response fine ? ",parseResponse)
  
      await updateRecord({
        documentID: state.id,
        kanbanRecords: text,
      });
  
      navigate(`/screening-schedules`, { state: parseResponse });
    } catch (error) {
      console.error("Error processing treatment plan", error);
    } finally {
      setProcessing(false);
    }

  }




  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
        onClick={handleOpenModal}
      >
        {/* <IconFileUpload /> */}
        Upload Report
      </button>

      {/* {file upload modal } */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handleFileChange}
        uploading={uploading}
        uploadSuccess={uploadSuccess}
        filename={filename}
        onFileUpload={handleUpload}
      />
      <RecordDetailsHeader recordName={recordName} />

      <div className="w-full">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border border-neutral-700 bg-[#13131a] p-4 shadow-sm">
                <div className="border-b border-neutral-700 px-6 py-4">
                  <h2 className="text-xl font-semibold text-neutral-200">
                    Personalised AI-Driven Treatment Plan
                  </h2>
                  <p className="text-sm text-neutral-400">
                    A tailored medical strategy leveraging advanced AI insights.
                  </p>
                </div>

                <div className="flex w-full flex-col px-6 py-4 text-white">
                  <div className="">
                    <h2 className="text-lg font-semibold text-white">
                      Analysis Result
                    </h2>
                    <div className="space-y-2">
                      <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={processTreatmentPlan}
                    className="inline-flex items-center gap-x-2 rounded-md border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
                  >
                    View Treatment Plan
                    <IconChevronRight size={20} />
                    {processing && (
                      <IconProgress
                        size={10}
                        className="mr-3 h-5 w-5 animate-spin"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleRecordDetails;
