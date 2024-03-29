import { HttpResponse } from "./../protocols/http";

export const ServerError = (): HttpResponse => {
	return {
		statusCode: 500,
		body: {
			msg: "Server Internal Error"
		}
	};
};


export const BadRequest = (params: any): HttpResponse => {
	return {
		statusCode: 400,
		body: {
			msg: params
		}
	};
};

export const Unauthorized = (params: any): HttpResponse => {
	return {
		statusCode: 401,
		body: {
			msg: params,
		}
	};
};

export const NotFound = (params: any): HttpResponse =>{
	return {
		statusCode: 404,
		body: {
			msg: params
		}
	};
};

export const Forbidden = (params: any): HttpResponse => {
	return {
		statusCode: 403,
		body: {
			msg: params
		}
	};
};

export const Created = (params: any): HttpResponse => {
	return {
		statusCode: 201,
		body: {
			msg: params
		}
	};
};

export const Success = (params: any): HttpResponse => {
	return {
		statusCode: 200,
		body: {
			params
		}
	};
};

