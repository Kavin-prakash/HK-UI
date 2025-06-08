// import { Button, Grid, Icon, Tooltip } from '@mui/material'
// import { Box, TextField, InputAdornment, IconButton, Typography, styled } from '@mui/material';
// import Navbar from '../Components/Navbar'
// import SendIcon from '@mui/icons-material/Send';
// import { useRef, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import PersonIcon from '@mui/icons-material/Person';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import dayjs from 'dayjs';
// import ReactJson from 'react-json-view';
// import { FileUploader } from "react-drag-drop-files";
// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

// const Chat = () => {
//     const fileInputRef = useRef(null);
//     const [chatHistory, SetChatHistory] = useState([]);
//     const [storeUserInput, SetStoreUserInput] = useState('');
//     const [storeUserFile, SetStoreUserFile] = useState(null); // Initialize with null for no file

//     const [mock, Setmock] = useState({});

//     const handleuserInput = (data) => {
//         SetStoreUserInput(data);
//     }

//     const handlefileUpload = (event) => {
//         SetStoreUserFile(event.target.files[0]);
//     }

//     // Function to clear both the input field and the file input
//     const clearInputs = () => {
//         SetStoreUserInput('');
//         SetStoreUserFile(null); // Clear the stored file state
//         if (fileInputRef.current) {
//             fileInputRef.current.value = null; // Clear the actual file input element
//         }
//     }

//     const savecurrentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

//     const handleSubmit = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('userinput', storeUserInput);
//             if (storeUserFile) { // Only append file if it exists
//                 formData.append('file', storeUserFile);
//             }

//             const response = await axios.post('http://127.0.0.1:5000/upload', formData);
//             // const response = await axios.post('http://127.0.0.1:5000/api/handshake', formData);

//             // console.log("Response Type:", typeof (response.data.gemini_response))
//             console.log("Response Type:", typeof (response.data.result))

//             Setmock(response.data.result)


//             const newEntry = {
//                 userInput: storeUserInput,
//                 userFile: storeUserFile, // Store the file object in chat history for display
//                 // response: response.data.message,
//                 // savedDate: savecurrentDate,
//                 response: response.data.result,
//                 // response: response.data.gemini_response,
//             }
//             SetChatHistory((prevHistory) => [...prevHistory, newEntry]);

//             clearInputs(); // Call the clearInputs function after successful submission

//             console.log(response.data.gemini_response);
//         } catch (error) {
//             console.log("Error in handleSubmit:", error);
//             // Optionally, you might want to clear inputs even on error or show an error message
//             // clearInputs();
//         }
//     };
//     const [file, setFile] = useState(null);
//     console.log(file)
//     const fileTypes = ["PDF", "JPG", "PNG",];

//     const handledraganddrop = (file) => {
//         setFile(file)
//     }
//     return (
//         <>
//             <Grid sx={{ bgcolor: 'grey.200', height: '100vh', display: 'flex', flexDirection: 'column' }} container spacing={5} >
//                 <Grid size={12} >
//                     <Navbar />
//                 </Grid>
//                 <Grid size={12} sx={{
//                     height: '200px', bgcolor: '', display: 'flex', flexDirection: 'row', justifyContent: 'center',
//                     alignItems: 'center'
//                 }}>
//                     <Box component="section"
//                         sx={{
//                             border: '2px dashed #1976d2',
//                             borderRadius: '8px',
//                             padding: '20px',
//                             backgroundColor: '#f5f5f5',
//                             // width: '100%',
//                             // paddingBlock:'40px',
//                             textAlign: 'center',
//                         }}
//                     >
//                         <FileUploader
//                             label='Upload or drop a file here'
//                             uploadedLabel="File Uploaded Succesfully"
//                             name='file' handleChange={handledraganddrop} types={fileTypes} />
//                     </Box>

//                 </Grid>
//                 <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '20px' }}>
//                     <Box component="section" sx={{
//                         width: 850,
//                         maxWidth: '100%',
//                         padding: '20px',
//                         border: 'solid 1px #ccc',
//                         borderRadius: '50px',
//                         bgcolor: 'white',
//                     }}>
//                         <TextField
//                             fullWidth
//                             value={storeUserInput}
//                             onChange={(e) => handleuserInput(e.target.value)}
//                             label="Ask anything to AI"
//                             id="fullWidth"
//                             sx={{ maxWidth: '800px', borderRadius: '50px' }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end" sx={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
//                                         <Tooltip title="Upload File" placement='top'>
//                                             <Button
//                                                 edge="end"
//                                                 variant="contained"
//                                                 color="primary"
//                                                 startIcon={<UploadFileIcon />}
//                                                 sx={{ ml: 1 }}
//                                                 onClick={() => fileInputRef.current.click()}
//                                             >
//                                                 <VisuallyHiddenInput
//                                                     type="file"
//                                                     ref={fileInputRef}
//                                                     onChange={handlefileUpload}
//                                                 />
//                                             </Button>
//                                         </Tooltip>
//                                         {
//                                             storeUserFile &&
//                                             (
//                                                 <Tooltip title="Clear Inputs" placement="top">
//                                                     <IconButton edge="end" onClick={() => {
//                                                         SetStoreUserFile(null); // Clear the file state
//                                                         if (fileInputRef.current) {
//                                                             fileInputRef.current.value = null; // Clear the actual file input element
//                                                         }
//                                                     }}>
//                                                         <CancelIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             )
//                                         }
//                                         {
//                                             storeUserFile &&
//                                             (
//                                                 <Typography variant='body1' sx={{ mt: 1, color: 'green' }}>
//                                                     {storeUserFile.name}
//                                                 </Typography>
//                                             )
//                                         }
//                                         <Tooltip title="Send" placement='top'>
//                                             <IconButton disabled={!storeUserInput} edge='end' onClick={handleSubmit}>
//                                                 <SendIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </InputAdornment>
//                                 )
//                             }}
//                         />
//                     </Box>
//                 </Grid>
//             </Grid >
//         </>
//     )
// }

// export default Chat;

import { Button, Grid, Icon, Tooltip, CircularProgress } from '@mui/material';
import { Box, TextField, InputAdornment, IconButton, Typography, styled, LinearProgress } from '@mui/material';
import Navbar from '../Components/Navbar';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import dayjs from 'dayjs';
import ReactJson from 'react-json-view';
import { FileUploader } from "react-drag-drop-files";
import Alert from '@mui/material/Alert';
import FileUpload from '../Components/FileUpload';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Link // Import Link for opening PDF
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Icon for PDF

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Chat = () => {
    const fileInputRef = useRef(null);
    const [alert, Setalert] = useState(false);
    const [chatHistory, SetChatHistory] = useState([]);
    const [storeUserInput, SetStoreUserInput] = useState('');
    console.log("Stored User Input", storeUserInput)
    const [storeUserFile, SetStoreUserFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ollamaResponseData, setOllamaResponseData] = useState(null);
    const [highlightedPdfUrl, setHighlightedPdfUrl] = useState(null);
    const [showPdf, setShowPdf] = useState(false);
    const [previewPdfUrl, setPreviewPdfUrl] = useState(null); // New state for PDF preview URL

    // Clean up the object URL when the component unmounts or the file changes
    useEffect(() => {
        return () => {
            if (previewPdfUrl) {
                URL.revokeObjectURL(previewPdfUrl);
            }
        };
    }, [previewPdfUrl]);


    const handleuserInput = (data) => {
        SetStoreUserInput(data);
    };

    const handleFileChange = (file) => {
        SetStoreUserFile(file);
        if (file && file.type === 'application/pdf') {
            setShowPdf(true);
            // Create object URL only when a new PDF is selected
            if (previewPdfUrl) { // Revoke previous URL if exists
                URL.revokeObjectURL(previewPdfUrl);
            }
            setPreviewPdfUrl(URL.createObjectURL(file));
        } else {
            setShowPdf(false);
            if (previewPdfUrl) {
                URL.revokeObjectURL(previewPdfUrl);
                setPreviewPdfUrl(null);
            }
        }
    };

    const handleFileUploadButtonClick = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        handleFileChange(file);
    };

    const handleDragAndDropFile = (file) => {
        handleFileChange(file);
    };

    const clearInputs = () => {
        SetStoreUserInput('');
        SetStoreUserFile(null);
        setShowPdf(false);
        if (previewPdfUrl) {
            URL.revokeObjectURL(previewPdfUrl);
            setPreviewPdfUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setOllamaResponseData(null); // Clear previous results
        setHighlightedPdfUrl(null); // Clear previous PDF URL

        try {
            const formData = new FormData();
            formData.append('userinput', storeUserInput);
            if (storeUserFile) {
                formData.append('file', storeUserFile);
            }
            clearInputs(); // Clear inputs after appending to formData

            const response = await axios.post('http://127.0.0.1:5000/upload', formData); // Use your Ollama endpoint

            console.log("Full Server Response:", response.data);

            let parsedResult = response.data.result;
            if (typeof parsedResult === 'string') {
                try {
                    parsedResult = JSON.parse(parsedResult);
                } catch (e) {
                    console.error("Failed to parse 'result' string into JSON:", e);
                }
            }

            setOllamaResponseData(parsedResult);
            setHighlightedPdfUrl(`http://127.0.0.1:5000${response.data.highlighted_pdf_url}`);

            const newEntry = {
                userInput: storeUserInput,
                userFile: storeUserFile ? storeUserFile.name : null,
                responseData: parsedResult,
                pdfUrl: `http://127.0.0.1:5000${response.data.highlighted_pdf_url}`
            };
            SetChatHistory((prevHistory) => [...prevHistory, newEntry]);

        } catch (error) {
            console.error("Error in handleSubmit:", error);
            Setalert(true);
            setTimeout(() => Setalert(false), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const fileTypes = ["PDF", "JPG", "PNG"];

    return (
        <>
            <Grid sx={{ bgcolor: 'grey.200', height: '100vh', display: 'flex', flexDirection: 'column', rowGap: '30px' }} spacing={12} >
                <Grid item xs={12} >
                    <Navbar />
                </Grid>
                <Grid item xs={12} sx={{
                    height: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box component="section"
                        sx={{
                            border: '2px dashed #1976d2',
                            borderRadius: '8px',
                            padding: '20px',
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                    >
                        <FileUploader
                            label='Upload or drop a file here'
                            uploadedLabel={storeUserFile ? `File Uploaded: ${storeUserFile.name}` : "File Uploaded Successfully"}
                            name='file'
                            handleChange={handleDragAndDropFile}
                            types={fileTypes}
                            disabled={isLoading || storeUserFile} // Disable if a file is already selected or loading
                        />
                        {storeUserFile && (
                            <Typography variant='body2' sx={{ color: 'green', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mt: 1 }}>
                                {storeUserFile.name}
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '20px' }}>
                    <Box component="section" sx={{
                        width: 850,
                        maxWidth: '100%',
                        padding: '20px',
                        border: 'solid 1px #ccc',
                        borderRadius: '50px',
                        bgcolor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <TextField
                            fullWidth
                            value={storeUserInput}
                            onChange={(e) => handleuserInput(e.target.value)}
                            label="Ask anything to AI"
                            id="fullWidth"
                            sx={{ maxWidth: '800px', borderRadius: '50px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
                                        <Tooltip title="Upload File" placement='top'>
                                            <Button
                                                edge="end"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<UploadFileIcon />}
                                                sx={{ ml: 1 }}
                                                onClick={() => fileInputRef.current.click()}
                                                disabled={isLoading || storeUserFile}
                                            >
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileUploadButtonClick}
                                                />
                                            </Button>
                                        </Tooltip>
                                        {
                                            storeUserFile &&
                                            (
                                                <Tooltip title="Clear File" placement="top">
                                                    <IconButton edge="end" onClick={clearInputs} disabled={isLoading}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }
                                        <Tooltip title="Send" placement='top'>
                                            <IconButton disabled={!storeUserInput || isLoading} edge='end' onClick={handleSubmit}>
                                                {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Grid>

                {/* JSx for Showing the PDF file for the user Preview */}
                {showPdf && previewPdfUrl && ( // Use previewPdfUrl here
                    <Grid item xs={12} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            width: '80%',
                            height: '600px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: 2,
                            backgroundColor: 'white',
                        }}>
                            <iframe
                                src={`${previewPdfUrl}#zoom=150`} // Use previewPdfUrl
                                width="100%"
                                height="100%"
                                title="PDF Preview"
                                style={{ border: 'none' }}
                            />
                        </Box>
                    </Grid>
                )}

                {/* Displaying the Ollama model response (extracted JSON) and PDF link */}
                {ollamaResponseData && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Box sx={{ width: 850, p: 3, border: '1px solid #eee', borderRadius: '8px', bgcolor: 'white' }}>
                            <Typography variant="h6" gutterBottom>
                                Extracted Data:
                            </Typography>
                            {Object.keys(ollamaResponseData).length > 0 ? (
                                <Box sx={{ maxHeight: 280, overflowY: 'auto' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Key</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(ollamaResponseData).map(([key, value]) => (
                                                <TableRow key={key}>
                                                    <TableCell>{key}</TableCell>
                                                    <TableCell>{value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            ) : (
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    No data extracted.
                                </Typography>
                            )}

                            {highlightedPdfUrl && (
                                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PictureAsPdfIcon color="error" />
                                    <Link href={highlightedPdfUrl} target="_blank" rel="noopener noreferrer" variant="body1">
                                        View Highlighted PDF
                                    </Link>
                                    <Typography variant="body2" color="text.secondary">
                                        (Opens in a new tab)
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                )}


                {/* Loader in the center of the screen */}
                {isLoading && (
                    <Box sx={{
                        position: 'fixed',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        zIndex: 1300,
                    }}>
                        <CircularProgress size={60} />
                        <Typography variant="h6" color="text.secondary">
                            Generating Response......!
                        </Typography>
                    </Box>
                )}

                {/* Alert for errors */}
                {alert && (
                    <Alert
                        severity="error"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1400,
                        }}
                    >
                        An error occurred while processing your request. Please try again.
                    </Alert>
                )}

            </Grid >
        </>
    );
};

export default Chat;