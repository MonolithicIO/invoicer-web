package features.ui.screens.authmenu

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.primarySurface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import features.ui.screens.authmenu.components.AuthMenuLeftSection
import features.ui.screens.authmenu.components.AuthMenuRightSection

@Composable
internal fun AuthMenuScreen(
    modifier: Modifier = Modifier
) {
    Scaffold(
        modifier = modifier
    ) {
        Row(
            modifier = Modifier.fillMaxSize()
        ) {
            AuthMenuLeftSection(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight()
                    .background(MaterialTheme.colors.primaryVariant)
            )

//            AuthMenuRightSection(
//                modifier = Modifier
//                    .weight(1f)
//                    .fillMaxHeight()
//                    .background(MaterialTheme.colors.primarySurface)
//            )
        }
    }
}