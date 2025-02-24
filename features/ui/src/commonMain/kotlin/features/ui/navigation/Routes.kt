package features.ui.navigation

import kotlinx.serialization.Serializable

@Serializable
sealed interface InvoicerRoute {

    sealed interface Auth : InvoicerRoute {

        @Serializable
        data object AuthMenu : InvoicerRoute

        @Serializable
        data class SignIn(val redirect: String? = null) : Auth

        @Serializable
        data class SignUp(val redirect: String? = null) : Auth
    }
}