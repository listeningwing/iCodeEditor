#!/usr/bin/perl

# This script used to make a language built-in unique symbols
# Author: Yeung

use strict;
use warnings;
use utf8;

binmode STDIN, ':utf8';
binmode STDOUT, ':utf8';
binmode STDERR, ':utf8';

sub uniqueSymbols{
  my $in = shift @_;

  open(FILE, '<:encoding(utf8)', $in) or die "Error: $!\n";
  
  my @list = ();
   
  while (<FILE>) {
    my $line = $_;
    chomp $line;
    $line =~ s/^\s+//g;
    $line =~ s/\s+$//g;
    $line =~ s/\s+/ /g; # collapse whitespaces
    
    next if length($line) < 2;
    next if ($line =~ /#/); # skip comment
    
    unless (grep { $_ eq $line } @list) {
       push @list, $line;
    }
  }

  close(FILE);

  my $length = $#list+1;
  if ($length > 0 ){
      my @sorted = sort @list;
      #print "@sorted\n";
      foreach( @sorted) {
          print($_."\n");
      }
  }

  
}


my $num_args = $#ARGV + 1;
if ($num_args != 1) {
    print "\nUsage: perl symbols.pl file.txt\n";
    exit;
}

my $file = $ARGV[0];
& uniqueSymbols($file);



