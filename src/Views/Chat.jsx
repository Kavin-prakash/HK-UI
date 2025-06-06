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
import { Box, TextField, InputAdornment, IconButton, Typography, styled } from '@mui/material';
import Navbar from '../Components/Navbar';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from 'react';
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
    const [alter, Setalert] = useState(false);
    const [chatHistory, SetChatHistory] = useState([]);
    const [storeUserInput, SetStoreUserInput] = useState('');
    const [storeUserFile, SetStoreUserFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New state for loader

    const [mock, Setmock] = useState([]);
    console.log("Mock API Response", mock);
    const handleuserInput = (data) => {
        SetStoreUserInput(data);
    };

    // Handles file upload from the hidden input (button click)
    const handleFileUploadButtonClick = (event) => {
        const file = event.target.files[0];
        SetStoreUserFile(file);
    };

    // Handles file upload from drag and drop
    const handleDragAndDropFile = (file) => {
        SetStoreUserFile(file);
    };

    const clearInputs = () => {
        SetStoreUserInput('');
        SetStoreUserFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Clear the value of the hidden file input
        }
    };

    const handleOllamaModelResponse = (apiResponse) => {
        // Parsing the Outer Json String
        const outerJson = JSON.parse(apiResponse);
        const innerJson = outerJson.result;
        Setmock(innerJson);
    }

    const handleSubmit = async () => {
        setIsLoading(true); // Show loader when request starts
        try {
            const formData = new FormData();
            formData.append('userinput', storeUserInput);
            if (storeUserFile) {
                formData.append('file', storeUserFile);
            }
            clearInputs();
            const response = await axios.post('http://127.0.0.1:5000/upload', formData);

            console.log("Response Type:", typeof (response.data.result));

            // Setmock(response.data.result);
            handleOllamaModelResponse(response.data);
            const newEntry = {
                userInput: storeUserInput,
                userFile: storeUserFile,
                response: response.data.result,
            };
            SetChatHistory((prevHistory) => [...prevHistory, newEntry]);

            console.log(response.data.gemini_response);
        } catch (error) {
            console.log("Error in handleSubmit:", error);
        } finally {
            setIsLoading(false); // Hide loader when request finishes (success or error)
        }
    };

    const fileTypes = ["PDF", "JPG", "PNG"];

    return (
        <>
            <Grid sx={{ bgcolor: 'grey.200', height: '100vh', display: 'flex', flexDirection: 'column' }} container spacing={5} >
                <Grid item xs={12} >
                    <Navbar />
                </Grid>
                {/* <Grid>
                    <FileUpload />
                </Grid> */}
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
                            disabled={isLoading || (storeUserFile && fileInputRef.current && fileInputRef.current.files.length > 0)} // Disable if loading or file from button is present
                        />
                        {storeUserFile && !fileInputRef.current?.files[0] && ( // Display file name only if it's from drag and drop
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
                                                disabled={isLoading || storeUserFile} // Disable upload button if loading or file from drag and drop is present
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
                                        {
                                            storeUserFile && fileInputRef.current?.files[0] && // Display file name only if it's from button click
                                            (
                                                <Typography variant='body2' sx={{ color: 'green', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {storeUserFile.name}
                                                </Typography>
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
                {/* Loader in the center of the screen */}
                {isLoading && (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}>
                        <CircularProgress size={60} />
                        <Typography variant="h6" color="text.secondary">
                            Thinking...
                        </Typography>
                    </Box>
                )}
            </Grid >
        </>
    );
};

export default Chat;