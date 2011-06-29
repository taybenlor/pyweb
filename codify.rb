require 'base64'

module Codify
  def encode(bin)
    Base64.urlsafe_encode(bin)
  end
  
  def decode(enc)
    Base64.urlsafe_decode(enc)
  end
  
  #stub
  def url_for(code)
    encode(code)
  end
  
  #stub
  def code_from(enc)
    decode(enc)
  end
end