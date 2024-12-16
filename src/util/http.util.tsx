export class HttpUtil {
    static getQueryStringFromObject(params: any): string {
       let response = '?';

       for (let key in params) {
           if (Array.isArray(params[key])) {
               params[key].forEach((element: any) => {
                   response += `${key}=${element}&`
               });
           } else {
               response += `${key}=${params[key]}&`
           }
       }

       return response;
   }
}

const httpUtil = new HttpUtil();
export {httpUtil};