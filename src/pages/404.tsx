import { NextPage } from 'next';
import Error from 'pages/_error';

const Error404: NextPage = () => <Error statusCode={404} />;

export default Error404;
