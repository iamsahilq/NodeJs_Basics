import moment from 'moment';
import _ from 'lodash';
import FileS from './files';
import requests from './requests';

const saveEmployeeDetails = async (id) => {
  try {
    console.log(`saveEmployeeDetails(${id})`);
    if (!Number(id)) {
      const error = new Error();
      error.message = 'Invalid id'; error.status = 400;
      return { error };
    }
    const baseUrl = 'http://dummy.restapiexample.com/api/v1/employee/';
    const url = baseUrl + id;
    const body = await requests.get(url);
    const data = _.get(body, 'data');
    if (!data?.data) {
      return { data: `No data for ${id}.` };
    }
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const fileName = `${timestamp}-employee_${id}`;
    FileS.writeFile(fileName, data.data);
    return { data };
  } catch (error) {
    console.log('Error saveEmployeeDetails:>> ', error);
    return { error };
  }
};

export default saveEmployeeDetails;
