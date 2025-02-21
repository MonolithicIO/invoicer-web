import 'package:flutter/cupertino.dart';
import 'package:injectable/injectable.dart';
import 'package:invoicer_web/features/auth/domain/model/sign_in_request_model.dart';
import 'package:invoicer_web/features/auth/domain/repository/auth_repository.dart';

@injectable
final class SignInViewModel extends ChangeNotifier {
  SignInViewModel(this.authRepository);

  final AuthRepository authRepository;

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
      await authRepository.signIn(
        SignInRequestModel(email: _email, password: _password),
      );
    } catch (e) {
      print(e);
    }
  }
}
