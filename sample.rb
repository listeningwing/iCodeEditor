# sample.rb

# call a method that does not defined.
def method_with_exception input
  puts "[MRB] call method_with_exception (#{input})"
  Main.print_hello  # An error occurred: uninitialized constant Main.
  puts
end

# root document directory
puts "global_rootdir: #{$global_rootdir}"


begin
  # Code that might raise an exception
  # For example: 1/0 will raise "An unexpected error occurred!"
  method_with_exception "xxx"
  puts "This code will execute if no exception occurs."
rescue => e
  # This block will execute if any exception is raised in the 'begin' block.
  # 'e' will hold the exception object, allowing you to inspect it.
  puts "An error occurred: #{e.message}"
  puts "Backtrace:\n#{e.backtrace.join("\n")}"
end

