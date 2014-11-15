def app_is_running?
  system 'lsof -i :9000 > /dev/null'
end

def start_app
  return if app_is_running?
  $grunt_sh_pid = Process.spawn 'grunt serve:dist > /dev/null'
end

def stop_app
  grunt_pid = `lsof -i :9000 | tail -1 | cut -c8-13`.to_i
  Process.kill('TERM', grunt_pid)
  # Process.wait grunt_pid

  Process.kill('TERM', $grunt_sh_pid)
  Process.wait $grunt_sh_pid
end

# global
at_exit do
  stop_app if app_is_running?
end
