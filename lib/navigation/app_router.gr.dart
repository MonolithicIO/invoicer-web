// dart format width=80
// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouterGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:auto_route/auto_route.dart' as _i3;
import 'package:invoicer_web/features/auth/screens/authmenu/auth_menu_screen.dart'
    as _i1;
import 'package:invoicer_web/features/auth/screens/signin/sign_in_screen.dart'
    as _i2;

/// generated route for
/// [_i1.AuthMenuScreen]
class AuthMenuRoute extends _i3.PageRouteInfo<void> {
  const AuthMenuRoute({List<_i3.PageRouteInfo>? children})
    : super(AuthMenuRoute.name, initialChildren: children);

  static const String name = 'AuthMenuRoute';

  static _i3.PageInfo page = _i3.PageInfo(
    name,
    builder: (data) {
      return const _i1.AuthMenuScreen();
    },
  );
}

/// generated route for
/// [_i2.SignInScreen]
class SignInRoute extends _i3.PageRouteInfo<void> {
  const SignInRoute({List<_i3.PageRouteInfo>? children})
    : super(SignInRoute.name, initialChildren: children);

  static const String name = 'SignInRoute';

  static _i3.PageInfo page = _i3.PageInfo(
    name,
    builder: (data) {
      return _i2.SignInScreen();
    },
  );
}
