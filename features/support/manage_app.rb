def app_is_running?
  system 'lsof -i :9000 > /dev/null'
end

def start_app
  system 'grunt serve:dist > /dev/null &'
end