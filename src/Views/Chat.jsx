import { Button, Grid, Icon, Tooltip, CircularProgress } from '@mui/material';
import { Box, TextField, InputAdornment, IconButton, Typography, styled } from '@mui/material'; // Removed LinearProgress as it's not used
import Navbar from '../Components/Navbar'; // Assuming you have this component
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Framer-motion imported but not used in the provided snippet
import PersonIcon from '@mui/icons-material/Person'; // Imported but not used
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; // Imported but not used
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Imported but not used
import dayjs from 'dayjs'; // Imported but not used
import ReactJson from 'react-json-view'; // Imported but not used
import { FileUploader } from "react-drag-drop-files";
import Alert from '@mui/material/Alert';
import FileUpload from '../Components/FileUpload'; // Imported but not used
import robogif from '../Asserts/Images/Artificial intelligence-bro.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import * as React from 'react';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import CheckIcon from '@mui/icons-material/Check';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Link // Import Link for opening PDF
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Icon for PDF

// Styled component for visually hidden file input
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
const fileTypes = ["PDF", "JPG", "PNG"]; // Allowed file types for the uploader

const Chat = () => {
    const fileInputRef = useRef(null); // Ref for the hidden file input element
    const [alert, Setalert] = useState(false); // State for displaying error alerts
    const [chatHistory, SetChatHistory] = useState([]); // State to store chat history (though not fully rendered in this snippet)
    const [storeUserInput, SetStoreUserInput] = useState(''); // State to hold user's text input
    const [storeUserFile, SetStoreUserFile] = useState(null); // State to hold the uploaded file object
    const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
    const [ollamaResponseData, setOllamaResponseData] = useState(null); // State to store parsed JSON response from LLM
    console.log("Logging the ollama Response", ollamaResponseData)
    const [highlightedPdfUrl, setHighlightedPdfUrl] = useState(null); // State for the URL of the server-generated highlighted PDF
    const [showPdf, setShowPdf] = useState(false); // State to control visibility of the PDF preview iframe
    const [previewPdfUrl, setPreviewPdfUrl] = useState(null); // State for the URL currently loaded in the PDF preview iframe

    // Effect to clean up object URLs when the component unmounts or previewPdfUrl changes
    useEffect(() => {
        return () => {
            if (previewPdfUrl) {
                URL.revokeObjectURL(previewPdfUrl); // Release the object URL to prevent memory leaks
            }
        };
    }, [previewPdfUrl]); // Rerun effect when previewPdfUrl changes

    // Handles changes in the text input field
    const handleuserInput = (data) => {
        SetStoreUserInput(data);
    };

    // Handles file selection, whether from drag-and-drop or button click
    const handleFileChange = (file) => {
        setOllamaResponseData(null);
        SetStoreUserFile(file);
        if (file && file.type === 'application/pdf') {
            setShowPdf(true); // Show the PDF preview area
            // Revoke previous object URL if it exists to prevent memory leaks
            if (previewPdfUrl) {
                URL.revokeObjectURL(previewPdfUrl);
            }
            setPreviewPdfUrl(URL.createObjectURL(file)); // Create a new object URL for the uploaded PDF
        } else {
            setShowPdf(false); // Hide PDF preview if not a PDF
            if (previewPdfUrl) {
                URL.revokeObjectURL(previewPdfUrl);
                setPreviewPdfUrl(null);
            }
        }
    };

    // Handler for the hidden file input's change event
    const handleFileUploadButtonClick = (event) => {
        const file = event.target.files[0];
        handleFileChange(file);

    };

    // Handler for the react-drag-drop-files component's change event
    const handleDragAndDropFile = (file) => {
        handleFileChange(file);
    };

    // Clears all input fields and resets PDF preview
    const clearInputs = () => {
        SetStoreUserInput('');
        SetStoreUserFile(null);
        setShowPdf(false);
        if (previewPdfUrl) {
            URL.revokeObjectURL(previewPdfUrl);
            setPreviewPdfUrl(null);
        }
        // Reset the value of the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    // Handles viewing the highlighted PDF from the server response in the iframe
    const handleViewHighlightedPdf = (url) => {
        setShowPdf(true); // Show the PDF preview area
        // Crucially, append '?download=false' to the URL to tell the server to serve it inline
        setPreviewPdfUrl(`${url}?download=false`);
        console.log("Attempting to preview highlighted PDF from:", url);
    }

    const handleClearPreviewpdf = () => {
        setShowPdf(false);
        // setHighlightedPdfUrl(null);
    }


    // Handles form submission to the backend
    const handleSubmit = async () => {
        setIsLoading(true); // Set loading state to true
        setOllamaResponseData(null); // Clear previous extracted data
        setHighlightedPdfUrl(null); // Clear previous highlighted PDF URL

        try {
            const formData = new FormData(); // Create FormData object for file upload
            formData.append('userinput', storeUserInput);
            if (storeUserFile) {
                formData.append('file', storeUserFile);
            }
            clearInputs(); // Clear inputs immediately after preparing formData

            // Send POST request to your backend endpoint
            const response = await axios.post('http://127.0.0.1:5000/upload', formData);

            console.log("Full Server Response:", response.data);

            let parsedResult = response.data.result;
            // Attempt to parse 'result' if it's a string (server might return JSON string)
            if (typeof parsedResult === 'string') {
                try {
                    parsedResult = JSON.parse(parsedResult);
                } catch (e) {
                    console.error("Failed to parse 'result' string into JSON:", e);
                    // Optionally set an error state or display an alert here
                }
            }

            setOllamaResponseData(parsedResult); // Store the extracted data
            // Construct the full URL for the highlighted PDF from the server response
            setHighlightedPdfUrl(`http://127.0.0.1:5000${response.data.highlighted_pdf_url}`);

            // Add the current interaction to chat history (if needed for display)
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
            setIsLoading(false); // Reset loading state
        }
    };


    return (
        <>
            <Grid item xs={12} >
                <Navbar />
            </Grid>
            <Grid sx={{ height: '100vh' }} container spacing={5}>
                <Grid sx={{
                    height: '100vh', display: 'flex', flexDirection: 'column', rowGap: '20px'
                }} size={6} >
                    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 1 }}>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Tooltip title='Choose Right Model' placement='right' >
                                        <Button sx={{ bgcolor: '#24125F' }} variant="contained" {...bindTrigger(popupState)}>
                                            <ModelTrainingIcon /> Select Model
                                        </Button>
                                    </Tooltip>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}><CheckIcon />Ollama llama3</MenuItem>
                                        <MenuItem disabled onClick={popupState.close}>Gemini Flash 2.5</MenuItem>
                                        <MenuItem disabled onClick={popupState.close}>ChatGpt 4.0   </MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </Grid>
                    < Grid item xs={12} sx={{
                        height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Grid>
                            <Box component="section"
                                sx={{
                                    border: '2px dashed #24125F',
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
                                    disabled={isLoading || storeUserFile}
                                />
                                {storeUserFile && (
                                    <Typography variant='body2' sx={{ color: 'green', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mt: 1 }}>
                                        {storeUserFile.name}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
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
                                                    // color="primary"
                                                    startIcon={<UploadFileIcon />}
                                                    sx={{ ml: 1, bgcolor: '#24125F' }}
                                                    onClick={() => fileInputRef.current.click()} // Triggers hidden input click
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
                                                <IconButton disabled={!storeUserFile || isLoading} edge='end' onClick={handleSubmit}>
                                                    {isLoading ? <CircularProgress size={24} /> : <SendIcon />} {/* Send icon or loading spinner */}
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Grid>
                    {/* Displaying the LLM response (extracted JSON) and PDF link */}
                    {ollamaResponseData && ( // Only show if there's extracted data
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
                                                        <TableCell>{value !== null && value !== undefined ? value : 'null'}</TableCell>
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

                                {highlightedPdfUrl && ( // Display download/preview links if a highlighted PDF URL exists
                                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PictureAsPdfIcon color="error" />
                                        <Link href={`${highlightedPdfUrl}?download=true`} target="_blank" rel="noopener noreferrer" variant="body1">
                                            Download Highlighted PDF
                                        </Link>
                                        <IconButton>
                                            <Button onClick={() => handleViewHighlightedPdf(highlightedPdfUrl)}>
                                                Pre-view Pdf {/* Button to preview in the iframe */}
                                            </Button>
                                            {
                                                showPdf ? <Tooltip placement='top' title='Close Pre-View'>
                                                    <IconButton onClick={handleClearPreviewpdf}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Tooltip> : <></>
                                            }
                                        </IconButton>
                                        {/* <Typography variant="body2" color="text.secondary">
                                            (Opens in a new tab)
                                        </Typography> */}
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
                                fontSize: '22px',
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
                <Grid sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }} size={6}>
                    {/* JSX for showing the PDF file for the user Preview */}
                    {showPdf && previewPdfUrl ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{
                                width: '100%',
                                height: '100vh',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: 2,
                                backgroundColor: 'white',
                            }}>
                                <iframe
                                    src={`${previewPdfUrl}#zoom=150`} // Loads the PDF, with a default zoom level
                                    width="100%"
                                    height="100%"
                                    title="PDF Preview"
                                    style={{ border: 'none' }}
                                />
                            </Box>
                        </Grid>
                    ) : <Grid>
                        <img style={{ height: '800px', width: '100%' }} src={robogif}></img>
                    </Grid>}
                </Grid>
            </Grid >
        </>
    );
};

export default Chat;