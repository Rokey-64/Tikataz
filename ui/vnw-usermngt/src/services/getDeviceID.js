import { v4 as uuidv4 } from 'uuid';

const getDeviceIDSVC = () => {

    // get device id
    let device_id = localStorage.getItem('device_id');

    // create device id if not exist
    if (!device_id) {
        device_id = uuidv4();
        localStorage.setItem('device_id', device_id);
    }
    return device_id;
};

export default getDeviceIDSVC;