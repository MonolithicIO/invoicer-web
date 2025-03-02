package features.ui.screens.signup

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import features.ui.screens.signup.components.SignUpLeftSection
import features.ui.screens.signup.components.rightsection.SignUpRightSection

@Composable
internal fun SignUpScreen(
    modifier: Modifier = Modifier,
    onBack: () -> Unit,
) {
    Scaffold(
        modifier = modifier,
    ) {
        Row(
            modifier = Modifier.fillMaxSize()
        ) {
            SignUpLeftSection(
                modifier = Modifier
                    .weight(1f)
                    .background(MaterialTheme.colors.primary)
                    .fillMaxHeight()
            )
            SignUpRightSection(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight(),
                onBack = onBack
            )
        }
    }
}

