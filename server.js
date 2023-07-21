import morgan from 'morgan';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser'; // Add the correct import for cookie-parser
import('./config/connexions.js'); // Make sure this import is valid and points to the correct file

import authRoute from './Routes/Auth.js';
import profileEdit from './Routes/profileEdit.js'; // Correct the import statement to use 'profileEdit' directly

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(new URL(import.meta.url).pathname, 'uploads')));
app.use('/user', profileEdit);
app.use('/api', authRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});