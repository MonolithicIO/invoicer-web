import 'package:http/http.dart' as http;

class HttpClient {

  Future<http.Response> get(String url) async {
    return http.get(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    );
  }

  Future<http.Response> post(String url) async {
    return http.get(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    );
  }
}
