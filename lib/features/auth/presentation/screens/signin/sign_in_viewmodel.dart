import 'package:flutter/cupertino.dart';
import 'package:injectable/injectable.dart';
import 'package:invoicer_web/features/auth/data/datasource/auth_remote_datasource.dart';

@injectable
final class SignInViewModel extends ChangeNotifier {
  SignInViewModel(this.authRemoteDataSource);

  final AuthRemoteDataSource authRemoteDataSource;

  var passwordCensored = true;

  void togglePasswordVisibility() {
    passwordCensored = !passwordCensored;
    notifyListeners();
  }

  void signIn(String email, String password) async {}
}
