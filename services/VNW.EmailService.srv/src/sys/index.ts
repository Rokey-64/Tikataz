import {errCode} from './err-code.js';
import TkzException from './otp-exception.js';
import {setFailedFeedback} from './failed-feedback.js';

const sys = {
    setFailedFeedback,
    errCode,
    TkzException
};

export default sys;