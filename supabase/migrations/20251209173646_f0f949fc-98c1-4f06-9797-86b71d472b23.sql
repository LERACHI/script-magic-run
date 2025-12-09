-- Create storage policies for outfit-images bucket to allow public access
CREATE POLICY "Allow public uploads to outfit-images" 
ON storage.objects 
FOR INSERT 
TO anon, authenticated
WITH CHECK (bucket_id = 'outfit-images');

CREATE POLICY "Allow public read access to outfit-images" 
ON storage.objects 
FOR SELECT 
TO anon, authenticated
USING (bucket_id = 'outfit-images');

CREATE POLICY "Allow public delete from outfit-images" 
ON storage.objects 
FOR DELETE 
TO anon, authenticated
USING (bucket_id = 'outfit-images');