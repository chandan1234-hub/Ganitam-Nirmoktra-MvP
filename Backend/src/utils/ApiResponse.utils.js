class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode,
            this.message = message,
            this.statusCode = statusCode < 400
        this.data = data
    }
}

export { ApiResponse }