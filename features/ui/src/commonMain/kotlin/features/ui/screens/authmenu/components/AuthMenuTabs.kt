package features.ui.screens.authmenu.components

import androidx.compose.material.MaterialTheme
import androidx.compose.material.Tab
import androidx.compose.material.TabRow
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import invoicerweb.features.ui.generated.resources.Res
import invoicerweb.features.ui.generated.resources.auth_tab_identity
import invoicerweb.features.ui.generated.resources.auth_tab_qr_code
import org.jetbrains.compose.resources.stringResource

@Composable
internal fun AuthMenuTabs(
    selectedTab: Int,
    onSelectTab: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    TabRow(
        modifier = modifier,
        selectedTabIndex = selectedTab,
        tabs = {
            Tab(
                selected = selectedTab == 0,
                content = {
                    Text(
                        text = stringResource(Res.string.auth_tab_identity),
                    )
                },
                onClick = { onSelectTab(0) }
            )
            Tab(
                selected = selectedTab == 1,
                content = {
                    Text(
                        text = stringResource(Res.string.auth_tab_qr_code),
                    )
                },
                onClick = { onSelectTab(1) }
            )
        },
        backgroundColor = MaterialTheme.colors.surface
    )
}