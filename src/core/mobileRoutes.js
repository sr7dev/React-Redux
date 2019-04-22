import bodyParser from 'body-parser';
import { sendEmail } from './email/sendEmail';
import { verifyJWTToken } from '../helpers/auth';

const mobileRoutes = app => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/sendEmailTemplate', function (req, res, next) {
    next();
  }, async (req, res) => {
    let status = 200, errorMessage;
    let requestData = req.body;
    let requestHeader = req.headers;
    let isLoggedInUser, sendEmailStatus;

    try {
      if (requestHeader && requestHeader.auth) {
        isLoggedInUser = await verifyJWTToken(requestHeader.auth);
      }

      if (requestHeader && requestData &&
        ((requestHeader.isAuth === true && isLoggedInUser) || !requestHeader.isAuth)) {
        if (requestData.to && requestData.type) {
          sendEmailStatus = await sendEmail(requestData.to, requestData.type, requestData.content);
          status = sendEmailStatus.status;
          errorMessage = sendEmailStatus.response;
        } else {
          status = 400;
          errorMessage = 'Receipt address or template type is required';
        }
      } else {
        status = 400;
        errorMessage = 'Something went wrong';
      }
    } catch (error) {
      status = 400;
      errorMessage = 'Something went wrong!, ' + error;
    }

    res.send({
      status,
      errorMessage
    });
  });

};

export default mobileRoutes;
