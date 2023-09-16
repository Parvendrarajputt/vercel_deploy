// import React, { useState, useEffect, useContext } from 'react';

// import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';

// import { API } from '../../service/api';
// import { DataContext } from '../../context/DataProvider';

// const Container = styled(Box)(({ theme }) => ({
//     margin: '50px 100px',
//     [theme.breakpoints.down('md')]: {
//         margin: 0
//     }
// }));

// const Image = styled('img')({
//     width: '100%',
//     height: '50vh',
//     objectFit: 'cover'
// });

// const StyledFormControl = styled(FormControl)`
//     margin-top: 10px;
//     display: flex;
//     flex-direction: row;
// `;

// const InputTextField = styled(InputBase)`
//     flex: 1;
//     margin: 0 30px;
//     font-size: 25px;
// `;

// const Textarea = styled(TextareaAutosize)`
//     width: 100%;
//     border: none;
//     margin-top: 50px;
//     font-size: 18px;
//     &:focus-visible {
//         outline: none;
//     }
// `;

// const initialPost = {
//     title: '',
//     description: '',
//     picture: '',
//     username: '',
//     categories: '',
//     createdDate: new Date()
// }

// const CreatePost = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [post, setPost] = useState(initialPost);
//     const [file, setFile] = useState('');
//     const { account } = useContext(DataContext);

//     const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
//     useEffect(() => {
//         const getImage = async () => { 
//             if(file) {
//                 const data = new FormData();
//                 data.append("name", file.name);
//                 data.append("file", file);
                
//                 const response = await API.uploadFile(data);
//                 post.picture = response.data;
//             }
//         }
//         getImage();
//         post.categories = location.search?.split('=')[1] || 'All';
//         post.username = account.username;
//     }, [file])

//     const savePost = async () => {
//         await API.createPost(post);
//         navigate('/');
//     }

//     const handleChange = (e) => {
//         setPost({ ...post, [e.target.name]: e.target.value });
//     }

//     return (
//         <Container>
//             <Image src={url} alt="post" />

//             <StyledFormControl>
//                 <label htmlFor="fileInput">
//                     <Add fontSize="large" color="action" />
//                 </label>
//                 <input
//                     type="file"
//                     id="fileInput"
//                     style={{ display: "none" }}
//                     onChange={(e) => setFile(e.target.files[0])}
//                 />
//                 <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
//                 <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
//             </StyledFormControl>

//             <Textarea
//                 rowsMin={5}
//                 placeholder="Tell your story..."
//                 name='description'
//                 onChange={(e) => handleChange(e)} 
//             />
//         </Container>
//     )
// }

// export default CreatePost;

// this is my code 

import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// const Container = styled(Box)(({ theme }) => ({
//     margin: '50px 100px',
//     padding: '20px', /* Add padding for a cleaner look */
//     borderRadius: '10px', /* Add rounded corners */
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', /* Add a subtle shadow */
//     backgroundColor: '#fff', /* Set a background color */
//     [theme.breakpoints.down('md')]: {
//         margin: 0
//     }
// }));

// const Image = styled('img')({
//     width: '100%',
//     height: '50vh',
//     objectFit: 'cover',
//     borderRadius: '10px', /* Add rounded corners to the image */
// });

// const StyledFormControl = styled(FormControl)`
//     margin-top: 20px; /* Adjust margin for better spacing */
//     display: flex;
//     flex-direction: column; /* Align children vertically */
//     align-items: center; /* Center align the children horizontally */
// `;

// const InputTextField = styled(InputBase)`
//     flex: 1;
//     margin: 15px 0; /* Adjust margin for better spacing */
//     padding: 10px; /* Add padding for input elements */
//     font-size: 20px; /* Increase font size for better readability */
//     border: 1px solid #ccc; /* Add a subtle border */
//     border-radius: 5px; /* Add rounded corners */
// `;

// const Textarea = styled(TextareaAutosize)`
//     width: 100%;
//     border: 1px solid #ccc; /* Add a subtle border */
//     border-radius: 5px; /* Add rounded corners */
//     margin-top: 20px; /* Adjust margin for better spacing */
//     padding: 10px; /* Add padding for text area */
//     font-size: 18px;
//     &:focus-visible {
//         outline: none;
//     }
// `;


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { account } = useContext(DataContext);

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                setPost(prevPost => ({
                    ...prevPost,
                    picture: response.data
                }));
            }
        }

        if (file) {
            getImage();
        }
    }, [file]);

    const savePost = async () => {
        setIsLoading(true);

        // Update post object with missing dependencies
        const updatedPost = {
            ...post,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        };

        await API.createPost(updatedPost);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? 'Publishing...' : 'Publish'}
                </Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)}
            />
        </Container>
    )
}

export default CreatePost;
