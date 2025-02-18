// dart format width=80
// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouterGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:auto_route/auto_route.dart' as _i3;
import 'package:flutter/material.dart' as _i4;
import 'package:invoicer_web/features/auth/presentation/screens/authmenu/auth_menu_screen.dart'
    as _i1;
import 'package:invoicer_web/features/auth/presentation/screens/signin/sign_in_screen.dart'
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
class SignInRoute extends _i3.PageRouteInfo<SignInRouteArgs> {
  SignInRoute({_i4.Key? key, List<_i3.PageRouteInfo>? children})
    : super(
        SignInRoute.name,
        args: SignInRouteArgs(key: key),
        initialChildren: children,
      );

  static const String name = 'SignInRoute';

  static _i3.PageInfo page = _i3.PageInfo(
    name,
    builder: (data) {
      final args = data.argsAs<SignInRouteArgs>(
        orElse: () => const SignInRouteArgs(),
      );
      return _i2.SignInScreen(key: args.key);
    },
  );
}

class SignInRouteArgs {
  const SignInRouteArgs({this.key});

  final _i4.Key? key;

  @override
  String toString() {
    return 'SignInRouteArgs{key: $key}';
  }
}
