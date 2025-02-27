package foundation.network

suspend fun <T> launchRequest(
    block: suspend () -> T
): HttpResponse<T> {
    return runCatching {
        block()
    }.fold(
        onSuccess = { HttpResponse.Success(it) },
        onFailure = { throwable ->
            when (throwable) {
                is HttpException -> HttpResponse.Failure.HttpError(
                    message = throwable.message,
                    timeStamp = throwable.timeStamp,
                    errorCode = throwable.errorCode
                )

                else -> HttpResponse.Failure.UnknownError(throwable)
            }
        }
    )
}

sealed interface HttpResponse<out T> {
    data class Success<T>(val data: T) : HttpResponse<T>

    sealed interface Failure : HttpResponse<Nothing> {
        data class HttpError(
            val message: String,
            val timeStamp: String,
            val errorCode: Int
        ) : Failure

        data class UnknownError(val cause: Throwable) : Failure
    }
}