

// import React, { useState, useEffect, useContext } from 'react';

// import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
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
//     const { account } = useContext(DataContext);

//     const [post, setPost] = useState({
//         title: '',
//         description: '',
//         picture: '',
//         username: '',
//         categories: '',
//         createdDate: new Date()
//     });
//     const [file, setFile] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [url, setUrl] = useState('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80');

//     useEffect(() => {
//         const getImage = async () => {
//             if (file) {
//                 const data = new FormData();
//                 data.append("name", file.name);
//                 data.append("file", file);
    
//                 const response = await API.uploadFile(data);
//                 // Update the 'url' to display the uploaded image
//                 setPost({
//                     ...post,
//                     picture: response.data.url // Assuming the URL is available in the response
//                 });
//             }
//         }
    
//         if (file) {
//             getImage();
//         }
//     }, [file]);
    

//     const savePost = async () => {
//         setIsLoading(true);

//         // Update post object with missing dependencies
//         const updatedPost = {
//             ...post,
//             categories: location.search?.split('=')[1] || 'All',
//             username: account.username
//         };

//         await API.createPost(updatedPost);
//         navigate('/');
//     }

//     const handleChange = (e) => {
//         setPost({ ...post, [e.target.name]: e.target.value });
//     }

//     const handleUrlChange = (e) => {
//         setUrl(e.target.value);
//         setPost({ ...post, picture: e.target.value });
//     }

//     return (
//         <Container>
// <Image src={post.picture || url} alt="post" /> 
//             <StyledFormControl>
//                 <label htmlFor="fileInput">
//                     <Add fontSize="large" color="action" />
//                 </label>
//                 <input
//                     type="file"
//                     id="fileInput"
//                     style={{ display: "none" }}
//                     onChange={(e) => handleUrlChange(e)} name='picture' placeholder="Image URL"
//                 />
//                 <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
//                 <Button onClick={() => savePost()} variant="contained" color="primary" disabled={isLoading}>
//                     {isLoading ? 'Publishing...' : 'Publish'}
//                 </Button>
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

import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

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
};

// const Textarea = styled(TextareaAutosize)`
//     width: 100%;
//     border: none;
//     margin-top: 50px;
//     font-size: 18px;
    
// };

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { account } = useContext(DataContext);

    const [post, setPost] = useState({
        title: '',
        description: '',
        picture: 'data:image/jpeg;base64,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',
        username: '',
        categories: '',
        createdDate: new Date()
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    }, []);

    const savePost = async () => {
        setIsLoading(true);

        const updatedPost = {
            ...post,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        };

        await API.createPost(updatedPost);
        navigate('/');
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPost({ ...post, picture: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container>
            <Image src={post.picture} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <InputTextField onChange={(e) => handleChange(e)} name="title" placeholder="Title" />
                <Button
                    onClick={() => savePost()}
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Publishing...' : 'Publish'}
                </Button>
            </StyledFormControl>
            <textarea
                rows={5}
                cols={150}
                placeholder="Tell your story..."
                name="description"
                onChange={(e) => handleChange(e)}
            />
        </Container>
    );
};

export default CreatePost;




