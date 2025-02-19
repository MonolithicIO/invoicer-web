import 'package:flutter/cupertino.dart';
import 'package:injectable/injectable.dart';
import 'package:invoicer_web/features/auth/data/datasource/auth_remote_datasource.dart';

import '../../../data/model/SignInRequestData.dart';

@injectable
final class SignInViewModel extends ChangeNotifier {
  SignInViewModel(this.authRemoteDataSource);

  final AuthRemoteDataSource authRemoteDataSource;

  var passwordCensored = true;
  var _email = "";
  var _password = "";

  void togglePasswordVisibility() {
    passwordCensored = !passwordCensored;
    notifyListeners();
  }

  void updateEmail(String value) {
    _email = value;
  }

  void updatePassword(String value) {
    _password = value;
  }

  void signIn() async {
    try {
      await authRemoteDataSource.signIn(SignInRequestData(email: _email, password: _password));
    } catch (e) {
      print(e);
    }
  }
}
