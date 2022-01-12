import fetch from 'node-fetch';
import moment from 'moment';
import _ from 'lodash';
import FileS from './files';

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
    const response = await fetch(url);
    if (response.status && response.status !== 200) {
      const error = new Error(response.statusText);
      error.status = response?.status || 500;
      return { error };
    }
    const body = await response.json();
    const data = _.get(body, 'data');
    if (!data) {
      return { data: `No data for ${id}.` };
    }
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const fileName = `${timestamp}-employee_${id}`;
    FileS.writeFile(fileName, data);
    return { data };
  } catch (error) {
    console.log('Error saveEmployeeDetails:>> ', error);
    return { error };
  }
};

export default saveEmployeeDetails;
