import 'package:auto_route/auto_route.dart';
import 'package:invoicer_web/navigation/app_router.gr.dart';

@AutoRouterConfig(replaceInRouteName: 'Screen|Page,Route')
class AppRouter extends RootStackRouter {
  @override
  List<AutoRoute> get routes => [
    AutoRoute(
        page: AuthMenuRoute.page,
        initial: true
    ),
    AutoRoute(page: SignInRoute.page),
  ];
}
